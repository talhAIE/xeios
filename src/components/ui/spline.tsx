"use client"

import { Suspense, lazy, memo, Component, ReactNode } from 'react'

// Use dynamic import for Spline to avoid SSR issues and better handle loading
const Spline = lazy(() => import('@splinetool/react-spline'))

// --- Error Boundary for Spline ---
interface ErrorBoundaryState {
    hasError: boolean
}

class SplineErrorBoundary extends Component<
    { children: ReactNode; fallback?: ReactNode },
    ErrorBoundaryState
> {
    constructor(props: { children: ReactNode; fallback?: ReactNode }) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback ?? (
                    <div className="w-full h-full flex items-center justify-center bg-surface/50 rounded-2xl">
                        <p className="text-gray-500 text-sm">3D scene unavailable</p>
                    </div>
                )
            )
        }
        return this.props.children
    }
}

interface SplineSceneProps {
    scene: string
    className?: string
}

export const SplineScene = memo(function SplineScene({ scene, className }: SplineSceneProps) {
    return (
        <div className={className} aria-label="Interactive 3D scene" role="img">
            <SplineErrorBoundary>
                <Suspense
                    fallback={
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-xeios"></span>
                        </div>
                    }
                >
                    <Spline
                        scene={scene}
                        className="w-full h-full"
                    />
                </Suspense>
            </SplineErrorBoundary>
        </div>
    )
});
