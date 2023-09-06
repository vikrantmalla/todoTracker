declare namespace Data {
  declare namespace ComponentData {
    interface TodoForm {
      inputValue: string;
      setInputValue: React.Dispatch<React.SetStateAction<string>>;
    }
  }

  declare namespace ContextData {
    interface Todo {
      id: string;
      text: string;
    }

    interface TodoState {
      todos: Todo[];
    }

    interface AuthState {
      showModal: boolean;
      showForgetPasswordModal: boolean;
    }
  }
}

export = Data;
