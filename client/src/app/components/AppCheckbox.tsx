import {useController, UseControllerProps} from "react-hook-form";
import {Checkbox, FormControlLabel} from "@mui/material";

interface Props extends UseControllerProps {
    label: string
}

export default function AppCheckbox(props: Props) {
    const {field} = useController({...props, defaultValue: false, disabled: false})
    return (
        <FormControlLabel
            control={<Checkbox
                {...field}
                checked={field.value}
                color={'secondary'}
                disabled={props.disabled}
            />}
            label={props.label}
        />
    )
}