import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// In-memory storage for the Netlify Demo
// (In a real production environment, this would use Prisma: prisma.customRequest.create)
const globalForRequests = global as unknown as { mockRequests: any[] };
if (!globalForRequests.mockRequests) {
  globalForRequests.mockRequests = [
    {
      id: 'REQ-1001',
      company: '한국전자통신연구원',
      contactName: '이석준 책임',
      phone: '010-1234-5678',
      inputVoltage: '3상 380V',
      outputVoltage: '3상 220V',
      capacity: '50kVA',
      quantity: '2',
      notes: '노이즈 쉴드 추가 요망, 하단 캐스터 장착',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Create new request object
    const newRequest = {
      id: `REQ-${1000 + globalForRequests.mockRequests.length + 1}`,
      ...body,
      createdAt: new Date().toISOString()
    };

    // Save to memory (for demo)
    globalForRequests.mockRequests.unshift(newRequest);

    return NextResponse.json({ success: true, data: newRequest });
  } catch (error) {
    console.error('Error saving request:', error);
    return NextResponse.json({ error: 'Failed to save request' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Admin check
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(globalForRequests.mockRequests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    return NextResponse.json(globalForRequests.mockRequests); // Return mock anyway if NextAuth fails
  }
}
