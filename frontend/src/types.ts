export interface Product {
    id: number;
    image_url: string;
    name: string;
    count: number;
    size_width: number;
    size_height: number;
    weight: string;
    comments: Comment[];
}

export interface ProductEdit {
    id: number;
    image_url?: string;
    name?: string;
    count?: number;
    size_width?: number;
    size_height?: number;
    weight?: string;
}

export interface Comment {
    id: number;
    product_id: number;
    description: string;
    date: string;
}

export interface AddProductModalProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => Promise<void>;
}
