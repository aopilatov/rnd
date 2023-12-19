FROM redhat/ubi9-minimal:9.1.0

RUN microdnf update -y \
    && microdnf upgrade -y \
    && microdnf install -y nano \
        vim \
        wget \
        openssl \
        gcc \
        g++ \
        lz4 \
        perl \
        yum-utils

RUN curl -sL https://rpm.nodesource.com/setup_18.x | bash -

RUN microdnf update -y \
    && microdnf install -y nodejs \
    && node -v \

WORKDIR /app
COPY . .

RUN npm i -g pnpm ts-node && \
  pnpm i && \
  pnpm run build

EXPOSE 3000
CMD ["pnpm", "run", "start:prod"]