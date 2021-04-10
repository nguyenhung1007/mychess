import * as React from 'react';
import { render } from '@testing-library/react';

import MsgSuccess, { MsgSuccessProps } from '.';

describe('MsgSuccess', () => {
    it('Render Correct Default Type', async () => {
        const data: MsgSuccessProps = { message: 'hello world' };

        const wrapper = render(<MsgSuccess {...data} />);

        const successMsg = await wrapper.findByTestId('msgsuccess');
        expect(successMsg.innerHTML).toBe(data.message);
        expect(wrapper).toMatchInlineSnapshot(`
            Object {
              "asFragment": [Function],
              "baseElement": <body>
                <div>
                  <p
                    class="text-first-uppercase text-green-500 fade-in"
                    data-testid="msgsuccess"
                  >
                    hello world
                  </p>
                </div>
              </body>,
              "container": <div>
                <p
                  class="text-first-uppercase text-green-500 fade-in"
                  data-testid="msgsuccess"
                >
                  hello world
                </p>
              </div>,
              "debug": [Function],
              "findAllByAltText": [Function],
              "findAllByDisplayValue": [Function],
              "findAllByLabelText": [Function],
              "findAllByPlaceholderText": [Function],
              "findAllByRole": [Function],
              "findAllByTestId": [Function],
              "findAllByText": [Function],
              "findAllByTitle": [Function],
              "findByAltText": [Function],
              "findByDisplayValue": [Function],
              "findByLabelText": [Function],
              "findByPlaceholderText": [Function],
              "findByRole": [Function],
              "findByTestId": [Function],
              "findByText": [Function],
              "findByTitle": [Function],
              "getAllByAltText": [Function],
              "getAllByDisplayValue": [Function],
              "getAllByLabelText": [Function],
              "getAllByPlaceholderText": [Function],
              "getAllByRole": [Function],
              "getAllByTestId": [Function],
              "getAllByText": [Function],
              "getAllByTitle": [Function],
              "getByAltText": [Function],
              "getByDisplayValue": [Function],
              "getByLabelText": [Function],
              "getByPlaceholderText": [Function],
              "getByRole": [Function],
              "getByTestId": [Function],
              "getByText": [Function],
              "getByTitle": [Function],
              "queryAllByAltText": [Function],
              "queryAllByDisplayValue": [Function],
              "queryAllByLabelText": [Function],
              "queryAllByPlaceholderText": [Function],
              "queryAllByRole": [Function],
              "queryAllByTestId": [Function],
              "queryAllByText": [Function],
              "queryAllByTitle": [Function],
              "queryByAltText": [Function],
              "queryByDisplayValue": [Function],
              "queryByLabelText": [Function],
              "queryByPlaceholderText": [Function],
              "queryByRole": [Function],
              "queryByTestId": [Function],
              "queryByText": [Function],
              "queryByTitle": [Function],
              "rerender": [Function],
              "unmount": [Function],
            }
        `);
    });
});