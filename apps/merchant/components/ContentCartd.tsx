import React from "react"

export const ContentCard = ({children, className}: {
    children: React.ReactNode,
    className?: string
}) => {
    return <div className={`rounded-xl bg-muted/50 ${className}`} >
        {children}
    </div>
}