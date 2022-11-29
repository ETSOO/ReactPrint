import React from 'react';
import { useReactToPrint } from '../src/index';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const Example = (props: { onBeforeGetContent: () => void }) => {
    const { onBeforeGetContent } = props;
    const componentRef = React.useRef(null);
    const handlePrint = useReactToPrint({
        onBeforeGetContent,
        content: () => componentRef.current
    });

    return (
        <div>
            <div ref={componentRef}>Hello, world!</div>
            <button onClick={() => handlePrint([1280])} />
        </div>
    );
};

it('Render Example', () => {
    // Arrange
    const fn = jest.fn();

    act(() => {
        render(<Example onBeforeGetContent={fn} />);
    });

    // Act, click the list
    const clicked = fireEvent.click(screen.getByRole('button'));
    expect(clicked).toBeTruthy();
    expect(fn).toBeCalled();
});
