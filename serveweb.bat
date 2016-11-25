@echo off
cd control
start gulp
cd dest
echo Serving player client on 0.0.0.0:8000
start php -S 0.0.0.0:8000
cd ../../overlay
start gulp
cd dest
echo Serving screen client on 0.0.0.0:8001
start php -S 0.0.0.0:8001
