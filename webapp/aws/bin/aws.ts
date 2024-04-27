#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CognitoAuthenticationStack } from '../lib/aws-stack';

const app = new cdk.App();
new CognitoAuthenticationStack(app, 'CognitoAuthenticationStack', {

});