/*
 * Fitness Messages
 *
 * This contains all the text for the Fitness container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Fitness';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Fitness',
  },
  weight: {
    id: `${scope}.weight`,
    defaultMessage: 'Weight',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
});
