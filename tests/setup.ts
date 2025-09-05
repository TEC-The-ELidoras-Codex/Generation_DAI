import { vi } from 'vitest'

// Mock Next.js specific modules
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
}))

vi.mock('next/font/google', () => ({
  Inter: () => ({ className: 'mocked-font' }),
}))