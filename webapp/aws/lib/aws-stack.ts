import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito'
import { Construct } from 'constructs';

export interface CognitoAuthenticationStackProps extends cdk.StackProps {
  brand: string
  environmentName: string
}
export class CognitoAuthenticationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, `divelogging-userpool`, {
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      advancedSecurityMode: cognito.AdvancedSecurityMode.AUDIT,
      autoVerify: { email: true },
      keepOriginal: { email: true },
      deletionProtection: false,
      mfa: cognito.Mfa.OFF,
      passwordPolicy: {
        minLength: 12,
        requireLowercase: false,
        requireUppercase: false,
        requireDigits: false,
        requireSymbols: false,
        tempPasswordValidity: cdk.Duration.days(14)
      },
      selfSignUpEnabled: true,
      signInAliases: {
        email: true
      },
      userPoolName: 'divelogging',
      userVerification: {
        emailStyle: cognito.VerificationEmailStyle.CODE
      },
    })

    const client = userPool.addClient('app-client', {
      userPoolClientName: 'diveloggin-web',
      accessTokenValidity: cdk.Duration.hours(8),
      idTokenValidity: cdk.Duration.hours(8),
      authFlows: {
        userSrp: true
      },
      preventUserExistenceErrors: true
    })
  }
}
