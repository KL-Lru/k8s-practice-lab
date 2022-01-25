FROM golang:1.17.6-bullseye as builder

ENV ROOT=/go/src/app
WORKDIR ${ROOT}

COPY go.mod go.sum ./
RUN go mod download

COPY . ./
RUN CGO_ENABLED=0 go build -o /go/bin/app

FROM gcr.io/distroless/static

COPY --from=builder /go/bin/app /
CMD ["/app"]
