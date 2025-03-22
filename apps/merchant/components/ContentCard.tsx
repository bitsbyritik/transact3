import React from "react"

export const ContentCard = ({children, className}: {
    children: React.ReactNode,
    className?: string
}) => {
    return <div className={`*:data-[slot=card]:shadow-xs @x:data-[slot=card]:shadow-xsl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6 rounded-xl aspect-video w-64 h-64 ${className}`} >
        {children}
    </div>
    
}