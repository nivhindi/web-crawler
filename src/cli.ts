#!/usr/bin/env node

import {program} from 'commander'

import { crawler, Options } from './commands/crawler'
 
const cli: Options = program
.version('0.1.0')
.option('-u, --url', 'Add url')
.option('-d, --depth', 'Add depth')
.parse(process.argv);

crawler(
   cli.args[0],
   Number(cli.args[1])
).then(result => console.log(result))