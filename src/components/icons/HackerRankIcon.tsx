import React from "react";

export const HackerRankIcon = ({ className }: { className?: string }) => {
    // Extract sizing from className if possible, or just use a style that forces fit
    return (
        <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5em' }}>
            <i className="fab fa-hackerrank"></i>
        </div>
    );
};
