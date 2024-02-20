import * as React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Button from '@/components/Button';

function renderButton(ui: React.JSX.Element, options = {}) {
    render(ui, options);
    return {
        button: screen.getByRole('button', { name: /hello world/i }),
    };
}

describe('Button', () => {
    it('should render the component', () => {
        const { button } = renderButton(<Button>Hello World</Button>);

        expect(button).toMatchInlineSnapshot(`
      <button
        class="bg-gray-500 border-gray-100 border-4 py-2 px-4 rounded-lg text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="button"
      >
        Hello World
      </button>
    `);
    });

    it('should be clicked', async () => {
        const mockClickHandler = jest.fn();
        const { button } = renderButton(
            <Button onClick={mockClickHandler}>Hello World</Button>,
        );

        await user.click(button);

        expect(mockClickHandler).toHaveBeenCalledTimes(1);
        expect(mockClickHandler).toHaveBeenCalledWith(
            expect.objectContaining({ target: expect.any(HTMLButtonElement) }),
        );
    });

    it('when disabled should not be clicked', async () => {
        const mockClickHandler = jest.fn();
        const { button } = renderButton(
            <Button onClick={mockClickHandler} disabled>
                Hello World
            </Button>,
        );

        await user.click(button);

        expect(mockClickHandler).toHaveBeenCalledTimes(0);
    });
});
