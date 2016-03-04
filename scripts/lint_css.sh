#!/bin/bash

find public -name "*.js" -print0 | xargs -0 jshint
find public -name "*.js" -print0 | xargs -0 jscs
