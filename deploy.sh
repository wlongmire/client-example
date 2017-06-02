#!/bin/bash

CURRENT_PATH=$(pwd)
S3_BUCKET_URL_BASE="ownersedge"
ENV=""

echo "1"

usage() { echo "Usage: $0 -e {dev qa, prod}" 1>&2; exit 1; }

echo "2"

function check_environment()
{
  if [ -z $ENV ]; then
    usage
    exit -1
  fi

  if [ $ENV != "dev" ] && [ $ENV != "qa" ] && [ $ENV != "prod" ]; then
    usage
    exit -1
  fi
}

echo "3"

function upload_website_to_s3()
{
  printf "~ uploading app to S3 ..."

  # upload to s3
  myCmd="aws s3 cp public/* \
        s3://$S3_BUCKET_URL_BASE-$ENV/ \
        --recursive"

  message=$(${myCmd[@]} 2>&1 | grep -i 'error')

  if [[ $message ]]; then
    printf "\t[FAIL]\n"
    echo $message
    exit -1
  fi

  printf "\t[OK]\n"
}

# get flags
while getopts "e:" o; do
  case "${o}" in
    e)
      ENV=${OPTARG}
      ;;
    *)
      usage
      ;;
  esac
done

# check if the environment variable is set and/or if it's correct
check_environment

# upload the cf template to s3 for reference
upload_website_to_s3

echo "success" > status.txt
