declare namespace Forms {
  interface LogInSubmitForm {
    loginEmail: string;
    loginPassword: string;
  }

  interface SignUpSubmitForm {
    signupName: string;
    signupEmail: string;
    signupPassword: string;
    signupConfirmPassword: string;
  }
}

export = Forms;
