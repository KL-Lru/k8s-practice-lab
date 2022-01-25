FROM golang:1.17.6-bullseye as builder

ENV ROOT=/go/src/app
WORKDIR ${ROOT}

COPY go.mod go.sum ./
RUN go mod download

COPY cmd/setup.go cmd/setup.go
RUN CGO_ENABLED=0 go build -o /go/bin/setup cmd/setup.go

FROM gcr.io/distroless/static

COPY --from=builder /go/bin/setup /
CMD ["/setup"]
