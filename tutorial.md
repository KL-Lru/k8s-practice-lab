# Kubernetes Tutorial

## Let's get started!!!

Kubernetesにサービスを実際に展開してみるTutorialです.

Kubernetes自体の構築については取り扱いません.

<walkthrough-tutorial-duration duration=45></walkthrough-tutorial-duration>

<walkthrough-project-setup></walkthrough-project-setup>

開始する場合は**開始** を押下してください.


## 今回構築する構成

### 簡単な構成
本Tutorial中では次の構成を構築します.

- HTML, JavaScript等の配信を行うファイル配信サーバ
- APIアクセスを受けつけ, RESTful APIを提供するAPIサーバ
- データを保持するDBサーバ

### 技術要素
技術要素としては次の要素を含みます.

- React / TypeScript
- Nginx
- Golang
- PostgreSQL

## 事前準備

今回のTutorialはCloud Shell上で行う想定ですが, localのshell環境でも実行可能です.

その場合, 一部動作確認のためのCLIのインストールが必要になる場合があります.

### gcloud SDK

Cloud Shellの場合インストール不要です.
必要に応じて公式よりインストールしてください.

https://cloud.google.com/sdk/docs/install

また, 次の設定を実行しておくことを推奨します.

```bash
gcloud config set project {{project-id}}
```

```bash
gcloud config set compute/region <メインとするRegion>
```

```bash
gcloud config set compute/zone <メインとするZone>
```

東京がメインの場合はRegionは`asia-northeast1`, Zoneは`asia-northeast1-a`等になります.

### kubectl CLI

Cloud Shellの場合インストール不要です.
必要に応じてインストールしてください.

gcloudコマンドが正常に設定されている状態であれば, 次のコマンドによって, クラスタの認証情報取得と同時に`kubectl`コマンドもインストールされます.

```bash
gcloud container clusters get-credentials <対象とするクラスタ>
```


既にクラスタの認証情報を取得済みの場合は, 次のコマンドで一覧の確認, 利用する認証情報の切り替えが行えます.

```
kubectl config get-contexts
```

```
kubectl config use-context <対象とするクラスタ>
```

### psql CLI (optional)

PostgreSQLへの接続に使用しますが, 特にDBの内部は気にせず, 構築だけ行う場合は特に必要ありません.

## Container Build 1

まず今回使用するコンテナを構築していきます.

### PostgreSQL

PostgreSQLはよくMySQLと比較されるRDBMSの一つです.

今回は公式配布のDocker Imageを用います.

まずpostgresqlのコンテナを起動して, psqlコマンドでコンテナに接続してみましょう.

```bash
docker run --name psql -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres:14.1
```

次のコマンド実行で現在存在しているデータベースの一覧を確認出来ます.

コンテナ起動直後であり, データを保持するように設定してもいないので, デフォルトで作成される `postgres`のデータベースと`template`のみが存在しています.

パスワードを問われるので, コンテナ起動時に設定した`"password"`を入力します
```bash
psql -U postgres -h 127.0.0.1 -W -l
```

コンテナを停止する場合は次のコマンドを実行します.
```
docker stop psql
```

## Deploy Container 1

初めてのDeployの時間です!

この際, クラスタやNamespaceに指定を受けている場合は, それに従って, リソースファイルを適切に変更してください.

ディレクトリは移動しておきましょう.
```bash
cd k8s/postgres
```

### 認証情報の生成

まずDBサーバに接続するための認証情報を生成します.
今回は`/k8s/postges/secret.env`に必要となる情報を詰め込んだファイルを用意しました.

パスワード等を変更したい場合は, この時点で変更しておいてください.

次のコマンドによって, secretの定義ファイルを生成/登録することが出来ます.
```bash
kubectl create secret generic --from-env-file secret.env -o yaml postgres-secret > psql.secret.yml
```

登録された情報は`psql.secret.yml`に出力されています.
.env内で定義した変数の値部分のみが暗号化され, 格納された状態になります.

### PostgreSQLのDeploy

先程の認証情報を用いるように設定が記述されたPostgreSQLの`StatefulSet`の定義が`k8s/postgres/psql.sts.yml`に記述されています.

これをapplyするのみで, Deployが完了します.

```bash
kubectl apply -f psql.sts.yml
```

StatefulSetが作成され, PodとPersistent Volumeも生成されていることを確認してみましょう.

```bash
kubectl get statefulset
```

```bash
kubectl get pods
```

```bash
kubectl get pv
```


### 動作を確認

`kubectl`コマンドを用いることで, localでdockerコンテナを立てた際と同様に, Kubernetes上のPodに接続することが出来ます.

```bash
kubectl port-forward postgresql-0 5432:5432
```

別タブで新たにshellを開き先程同様にデータベース一覧が取得できることを確認してみましょう.

この際, ユーザ名やパスワードは最初の手順で登録した認証情報で実行してください.

```bash
psql -U <secret.envに書いたUSER> -h 127.0.0.1 -W -l
```
確認が完了したらCtrl+Cにて, port forwardingを停止してください.

### コンテナの公開

`service`リソースを使って, 他のpodからアクセス可能な状態としておきます.

```bash
kubectl apply -f psql.svc.yml
```

## Container Build 2

DBサーバはDeployしましたが, このままではAPI等で利用するDBの初期化処理は実行完了出来ていません.

初期化を行う方法は種々様々あります.
- FrameworkのORM等の機能を使って自動的に実行させる
- 直接DBに接続し, 手動で初期化処理を実行する
- 別途初期化タスクを記述し, 実行させる

今回は3つ目の手法を取ってみます.
運用継続していく中であれば自動実行させるのが最も良いです.

1ファイルのみのタスクで, `web-server/cmd/setup.go`に処理内容が記述されています.

この処理を実行させるべく, Containerを作成しましょう.

```bash
cd web-server
```

```bash
docker build . -f setup.dockerfile -t gcr.io/{{project-id}}/<適当なImage名>:<適当なタグ>
```
ここで指定したイメージタグは, 今後`<setup image tag>`と記述します.
なお, gcr.io/{{project-id}}は, {{project-id}}管理下のContainer Registoryのホストを指します. 指定を誤らない用ご注意ください.

手元にて動作させてみたい場合には, Container Build 1の手順で行ったのと同様にPostgreSQLのコンテナを起動し, ユーザ名, パスワード, ホスト等を`.env`内に設定の上, コンテナを起動してください.

```bash
docker run -it --env-file=.env <setup image tag>
```

問題ない場合にはimageをpushします

```bash
docker push <setup image tag>
```

## Job Deploy

先程buildしたタスクのコンテナImageをDeployします.

`k8s/setup.job.yml`にJobの定義が途中まで記述されていますので, pushしたImageを適切に記述し, 反映してください.

```bash
kubectl apply -f setup.job.yml
```

正しく記述できていれば, setupのPodが1つのみ, かつCompletedになるはずです.

```bash
kubectl get pod
```

## Container Build 3

ここまででDBサーバは整備出来ました.

続いて, DBサーバに接続してAPIを提供するAPIサーバを構築します.
ソースコードは`web-server/`内の複数のファイルに記述されています.

APIサーバ用のコンテナをbuildしましょう.
```bash
cd web-server
```

```bash
docker build . -f webserver.dockerfile -t gcr.io/{{project-id}}/<適当なImage名>:<適当なタグ>
```

ここで指定したイメージタグは, 今後`<webserver image tag>`と記述します.
なお, gcr.io/{{project-id}}は, {{project-id}}管理下のContainer Registoryのホストを指します. 指定を誤らない用ご注意ください.

手元にて動作させてみたい場合には, Container Build 1の手順で行ったのと同様にPostgreSQLのコンテナを起動し, ユーザ名, パスワード, ホスト等を`.env`内に設定の上, コンテナを起動してください.

`.env`内のPORTの指定によって, 次のコマンドのport指定が変わります.
PORT=8080の場合は次のコマンドになります.

```bash
docker run -it --env-file=.env -p 8080:8080 <webserver image tag>
```

この状態で次のコマンドを叩くと, APIサーバが起動出来ていることが確認できます.

```bash
curl -v localhost:8080/apis/healthz
```

問題ない場合にはimageをpushします

```bash
docker push <webserver image tag>
```

## Web Server Deploy

### WebサーバのDeploy
buildしたAPIサーバをDeployします.

`k8s/webserver/web.deploy.yml`にDeploymentの定義が途中まで記述されていますので, pushしたImageを適切に記述し, 反映してください.

```bash
kubectl apply -f web.deploy.yml
```

正しく記述できていれば, Deploymentから生成されたPodが1つ, Runningになるはずです.

```bash
kubectl get pod
```

### 動作確認

PostgreSQLのとき同様に, port-forwardを用いて動作確認をしてみましょう.
このとき, 指定するpod名称はStatefulSetとは異なり, ランダム生成となるので, 接続したいpod名は確認しておきましょう

```bash
kubectl port-forward webserver-xxxxxx 8080:8080
```

別タブで新たにshellを開き先程同様にwebサーバにアクセスできることを確認してみましょう.

```bash
curl -v localhost:8080/apis/healthz
```

確認が完了したらCtrl+Cにて, port forwardingを停止してください.

### コンテナの公開

`service`リソースを使って, 他のpodからアクセス可能な状態としておきます.

```bash
kubectl apply -f web.svc.yml
```

## Container Build 4

### Nginx

Build済みのscriptファイル群を配信するために, Nginxを用います.

```bash
cd frontend
```

コンテナをbuild, 起動して挙動を確認してみましょう.

```bash
docker build . -t gcr.io/{{project-id}}/<適当なImage名>:<適当なタグ>
```
ここで指定したイメージタグは, 今後`<webserver image tag>`と記述します.
なお, 度々の注意書きになりますが, gcr.io/{{project-id}}は, {{project-id}}管理下のContainer Registoryのホストを指します. 指定を誤らない用ご注意ください.

```bash
docker run --name nginx -d -p 8080:8080 <webserver image tag>
```

この状態で<walkthrough-web-preview-icon></walkthrough-web-preview-icon>のボタンをクリックすると, 配信されるページを閲覧することが出来ます.

コンテナを停止する場合は次のコマンドを実行します.
```
docker stop nginx
```

## File Server Deploy

### ファイル配信サーバのDeploy
buildしたNginxをDeployします.

`k8s/frontend/nginx.deploy.yml`にDeploymentの定義が途中まで記述されていますので, pushしたImageを適切に記述し, 反映してください.

```bash
kubectl apply -f nginx.deploy.yml
```

正しく記述できていれば, Deploymentから生成されたPodが1つ, Runningになるはずです.

```bash
kubectl get pod
```

### 動作確認

PostgreSQLのとき同様に, port-forwardを用いて動作確認をしてみましょう.
このとき, 指定するpod名称はStatefulSetとは異なり, ランダム生成となるので, 接続したいpod名は確認しておきましょう

```bash
kubectl port-forward nginx-xxxxxx 8080:8080
```

この状態で<walkthrough-web-preview-icon></walkthrough-web-preview-icon>のボタンをクリックし, Webページが表示出来ることを確認してみましょう.
確認が完了したらCtrl+Cにて, port forwardingを停止してください.

### コンテナの公開

`service`リソースを使って, 他のpodからアクセス可能な状態としておきます.

```bash
kubectl apply -f nginx.svc.yml
```

## サービスの公開

最終ステップです.

ここまでで, 必要となるサービスは全て構築されました.

このサービス群をひとまとめにして公開してみましょう!

`k8s/ingress.yml`にアクセス時に利用可能なURL mapが定義されています.
applyしてみましょう.

```
kubectl apply -f ingress.yml
```

公開が完了するまでしばらくかかります.
次のコマンドで確認できる内容に外部IPが付与された状態となれば, 公開完了です!

該当のIPアドレスにアクセスすると, サービスを利用することが出来るようになります.

```
kubectl get ingress
```

## お疲れさまでした

今回はContainerのbuildからKubernetes上へのDeployまでを実施しました.

流れや実行に問題があった場合は本Tutorialの作者に問い詰めてください.

