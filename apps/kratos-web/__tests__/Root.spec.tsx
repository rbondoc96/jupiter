import {render} from '@testing-library/react';
import {describe, it} from 'vitest';

import {Root} from '@/Root';

describe('App', () => {
    it('renders the Root component', () => {
        render(<Root />);
    });
});
