#!/bin/bash
set -e

docker compose \
  --project-name mobilsiap \
  -f docker/prod/docker-compose.yml \
  "$@"
