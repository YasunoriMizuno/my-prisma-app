import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function Home() {
  // 1. データベースから全Todoを取得（サーバーサイドで実行）
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 2. Todoを追加する関数（Server Action）
  async function addTodo(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    if (!title) return;

    await prisma.todo.create({
      data: { title },
    });

    revalidatePath("/"); // 画面をリロードして最新データを表示
  }

  return (
    <div style={{ maxWidth: "500px", margin: "60px auto", padding: "20px", fontFamily: "sans-serif", backgroundColor: "#f9f9f9", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}>📝 Prisma Todo</h1>

      {/* 入力フォーム：これが直接DBに繋がります */}
      <form action={addTodo} style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        <input 
          name="title" 
          type="text" 
          placeholder="新しいタスク..." 
          required 
          style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px" }}
        />
        <button type="submit" style={{ padding: "12px 24px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>追加</button>
      </form>

      {/* リスト表示部分 */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ display: "flex", alignItems: "center", padding: "15px", backgroundColor: "white", marginBottom: "10px", borderRadius: "8px", border: "1px solid #eee" }}>
            <span style={{ fontSize: "20px", marginRight: "15px" }}>{todo.completed ? "✅" : "⏳"}</span>
            <span style={{ fontSize: "16px", color: "#444", fontWeight: 500 }}>{todo.title}</span>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && (
        <p style={{ textAlign: "center", color: "#999", marginTop: "20px" }}>まだタスクがありません。上のフォームから追加してみましょう！</p>
      )}
    </div>
  );
}