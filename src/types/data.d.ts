declare namespace ComponentData {
  interface TodoForm {
    tasks: string[];
    setTasks: React.Dispatch<React.SetStateAction<string[]>>;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    editIndex: number | null;
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
  }

  interface TodoList {
    tasks: string[];
    setTasks: React.Dispatch<React.SetStateAction<string[]>>;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
  }
}

export = ComponentData;
