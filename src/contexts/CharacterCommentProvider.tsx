import React, { createContext, useContext, useState, type ReactNode } from 'react';

type CommentsMap = Record<string, string>;
type CommentsContextType = {
    comments: CommentsMap;
    addComment: (id: string | number, text: string) => void;
};

const CommentsContext = createContext<CommentsContextType | undefined>(undefined);

export const useComments = (): CommentsContextType => {
    const context = useContext(CommentsContext);
    if (!context) {
        throw new Error('useComments must be used within a CommentsProvider');
    }
    return context;
};

const CommentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [comments, setComments] = useState<CommentsMap>({});

    const addComment = (charId: string | number, text: string) => {
        setComments(prev => ({
            ...prev,
            [charId]: text 
        }));
        };

    return (
        <CommentsContext.Provider value={{ comments, addComment }}>
            {children}
        </CommentsContext.Provider>
    );
};

export default CommentsProvider;
