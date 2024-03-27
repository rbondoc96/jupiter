# To-Do List

## Components

-   Create an `extractStyleProps` function to make it easier to choose which props to spread as styles into `sx` prop and which ones to spread into a component's props.
    -   Handle a11y props

## Styles

-   A `useStyleMixer` function that returns a `ThemeUIStyleObject` that is simply passed to the `sx` prop.
    -   Optionally takes a `baseStyles` object that it will merge the mixins into.
    -   Conflicting styles will be overridden by the mixins

```tsx
type UseStyleMixerHook = <MixinKey extends keyof Mixins>(
    key: MixinKey,
    values: Array<keyof Mixins[MixinKey]>,
    baseStyles?: ThemeUIStyleObject,
) => ThemeUIStyleObject;

const SpecialText = ({children}: PropsWithChildren) => {
    const styles: ThemeUIStyleObject = useStyleMixer(
        'text',
        ['gradientUnderlineOnHover', 'gradientText'],
        baseStyles,
    );

    return <Text sx={styles}>{children}</Text>;
};
```

## 5 April 2023 To-Do

-   [] Change all types in props to Property Key types
    -   [x] Box --> Moved to `Size`
    -   [x] Flex
    -   [x] Layout --> Renamed to `Positioning`
    -   [x] Margin
    -   [x] Padding
    -   [x] Stack
    -   [x] Typography
-   [x] Make a Master 'ComponentProps' or 'StyleProps' object that defines all props that can be defined on a component
