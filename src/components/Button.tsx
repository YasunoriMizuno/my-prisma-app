type ButtonProps = {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    color?: 'primary' | 'secondary' | 'danger';
    onClick?: () => void;
  };
  
  export default function Button({ 
    children, 
    type = 'button', 
    color = 'primary', 
    onClick 
  }: ButtonProps) {
    // 色ごとのクラス定義
    const colors = {
      primary: 'bg-blue-500 hover:bg-blue-700',
      secondary: 'bg-sky-500 hover:bg-sky-700',
      danger: 'bg-red-500 hover:bg-red-700',
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${colors[color]} text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer`}
      >
        {children}
      </button>
    );
  }