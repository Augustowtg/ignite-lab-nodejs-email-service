import { Replace } from "src/helpers/Replace";
import { Content } from "./content";
import { randomUUID } from "node:crypto";

export interface NotificationProps {
    recipientId: string;
    content: Content;
    category: string;
    readAt?: Date | null;
    canceledAt?: Date | null;
    createdAt: Date;
}

export class Notification {

    private _id: string;
    private props: NotificationProps;


    // Constructor e um replace para modificar a createdat para null 
    constructor(
        props: Replace<NotificationProps, { createdAt?: Date }>,
        id?: string
    ) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
        };
    }

    public get id() {
        return this._id;
    }

    // recipientId
    public set recipientId(recipientId: string) {
        this.props.recipientId = recipientId;
    }

    public get recipientId(): string {
        return this.props.recipientId;
    }

    // Content
    public set content(content: Content) {
        this.props.content = content;
    }

    public get content(): Content {
        return this.props.content;
    }

    // category
    public set category(category: string) {
        this.props.category = category;
    }

    public get category(): string {
        return this.props.category;
    }

    // readAt
    public read() {
        this.props.readAt = new Date();
    }

    public unread() {
        this.props.readAt = null;
    }

    public get readAt(): Date | null | undefined {
        return this.props.readAt;
    }

    // createdAt
    public set createdAt(createdAt: Date) {
        this.props.createdAt = createdAt;
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }


    // canceledAt
    public get canceledAt(): Date | null | undefined {
        return this.props.canceledAt;
    }

    public cancel() {
        this.props.canceledAt = new Date();
    }
}