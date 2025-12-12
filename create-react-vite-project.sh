#!/bin/bash

read -p 'React+Vite project name: ' projectName
echo 'project name is :' $projectName

# npm 7+, extra double-dash is needed:
npm create vite@latest $projectName -- --template react
