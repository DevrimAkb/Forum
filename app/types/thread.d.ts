type Thread = {
    id: number;
    title: string;
    description: string;
    username: string;
    creationDate: string;
    comments: Comment[];
}

type Comment = {
    id: number;
    username: string;
    content: string;
    createdAt: string;
}