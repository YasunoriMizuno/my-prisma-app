import PageTitle from '@/components/PageTitle';
import Button from '@/components/Button';
import Input from '@/components/Input';

// タスク作成画面
export default function CreateTaskPage() {
  return (
    <>
      <PageTitle title="タスク作成" />
      <form className="flex flex-col gap-3">
        <Input 
          label="タイトル" 
          type="text" 
          name="title" 
          placeholder="タイトル" 
          required 
        />
        <div className="flex flex-row gap-2 w-full">
          <label className="w-20">詳細</label>
          <textarea
            id="description"
            name="description"
            placeholder="詳細"
            required
            className="w-full max-w-xs h-24 border bg-white p-1"
          ></textarea>
        </div>
        <div className="flex flex-row gap-2 w-full">
          <label className="w-20">期限</label>
          <input 
            className="max-w-xs border bg-white p-1" 
            type="date" 
            id="deadline" 
            name="deadline" 
            required 
          />
        </div>
        <Button type="submit">作成する</Button>
      </form>
    </>
  );
}