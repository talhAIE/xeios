"use client"

import { Suspense, lazy, memo } from 'react'

// Use dynamic import for Spline to avoid SSR issues and better handle loading
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
    scene: string
    className?: string
}

export const SplineScene = memo(function SplineScene({ scene, className }: SplineSceneProps) {
    return (
        <div className={className}>
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
        </div>
    )
});
