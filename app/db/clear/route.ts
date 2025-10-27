// import { NextResponse } from 'next/server';
// import { db } from '@/app/db/drizzle';
// import { todos } from '@/app/db/schema';
// import { revalidatePath } from 'next/cache';

// export async function POST() {
//   // Clear out the todos for the (public) demo
//   // Because you can't trust an open <input> on the internet
//   await db.delete(todos);
//   revalidatePath('/db');

//   return NextResponse.json({ message: 'All todos deleted successfully' });
// }
import { NextResponse } from 'next/server';
import { db } from '@/app/db/drizzle';
import { todos } from '@/app/db/schema';

export async function GET() {
  try {
    const allTodos = await db.select().from(todos);
    return NextResponse.json(allTodos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}
