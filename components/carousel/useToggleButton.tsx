import * as React from 'react';
import { Button } from 'react-native'

export function useToggleButton(opts: {
    defaultValue: boolean;
    buttonTitle: string;
}) {
    const { buttonTitle, defaultValue = false } = opts;
    const [status, setStatus] = React.useState(defaultValue);

    const button = React.useMemo(() => {
        return (
            <Button title="press" onPress={() => setStatus(!status)}>
                {buttonTitle}: {`${status}`}
            </Button>
        );
    }, [status, buttonTitle]);

    return {
        status,
        button,
    };
}