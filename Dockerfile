FROM ubuntu:14.04

RUN apt-get -qq update && \
    apt-get install -y software-properties-common && \
    add-apt-repository -y ppa:jon-severinsson/ffmpeg && \
    apt-get -qq update && \
    apt-get -qq -y upgrade && \
    apt-get install -y ffmpeg

RUN ffmpeg -version
