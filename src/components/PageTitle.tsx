type PageTitleProps = {
    title: string;
  };
  
  /** 画面タイトル */
  export default function PageTitle({ title }: PageTitleProps) {
    return <h1 className="mb-5 font-bold">{title}</h1>;
  }