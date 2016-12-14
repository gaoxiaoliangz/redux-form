export declare const FORM: {
    CHANGE: string;
    RESET: string;
    TOUCH: string;
    DEFINE_FIELD: string;
    DESTROY: string;
    INITIALIZE: string;
};
export declare const initialize: (form: string, values: any, keepDirty?: boolean) => {
    type: string;
    meta: {
        form: string;
        keepDirty: boolean;
    };
    payload: any;
};
export declare const change: (form: any, field: any, value: any, touch: any, persistentSubmitErrors: any) => {
    type: string;
    meta: {
        form: any;
        field: any;
        touch: any;
        persistentSubmitErrors: any;
    };
    payload: any;
};
export declare const touch: (form: any, fields: string[]) => {
    type: string;
    meta: {
        form: any;
        fields: string[];
    };
};
export declare const defineField: (form: any, name: any) => {
    type: string;
    meta: {
        form: any;
    };
    payload: {
        name: any;
    };
};
export declare const reset: (form: string) => {
    type: string;
    meta: {
        form: string;
    };
};
export declare const destroy: (form: string) => {
    type: string;
    meta: {
        form: string;
    };
};
export declare const form: {
    change: (form: any, field: any, value: any, touch: any, persistentSubmitErrors: any) => {
        type: string;
        meta: {
            form: any;
            field: any;
            touch: any;
            persistentSubmitErrors: any;
        };
        payload: any;
    };
    touch: (form: any, fields: string[]) => {
        type: string;
        meta: {
            form: any;
            fields: string[];
        };
    };
    reset: (form: string) => {
        type: string;
        meta: {
            form: string;
        };
    };
    defineField: (form: any, name: any) => {
        type: string;
        meta: {
            form: any;
        };
        payload: {
            name: any;
        };
    };
    destroy: (form: string) => {
        type: string;
        meta: {
            form: string;
        };
    };
};
