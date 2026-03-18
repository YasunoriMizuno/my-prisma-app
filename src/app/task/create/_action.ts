'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function createTask(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const deadline = formData.get('deadline') as string;

  // Supabase（データベース）へ保存する命令
  await prisma.task.create({
    data: {
      title,
      description,
      deadline: new Date(deadline),
      status: '未着手',
    },
  });

  // 保存が終わったら一覧画面へジャンプ
  redirect('/task');
}