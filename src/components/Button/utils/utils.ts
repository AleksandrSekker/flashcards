const getClassesByColorPrimary = (color: string) => {
  switch (color) {
    case 'blue':
      return {
        regular: [
          'hover:bg-blue-500 hover:dark:bg-blue-900 hover:text-neutral-100 bg-blue-400 dark:bg-blue-800 text-white',
        ],
        disabled: ['bg-blue-200 text-white'],
      };
    case 'red':
      return {
        regular: [
          'hover:bg-red-500 hover:dark:bg-red-900 hover:text-neutral-100 bg-red-400 dark:bg-red-800 text-white',
        ],
        disabled: ['bg-red-200 text-white'],
      };
    case 'green':
      return {
        regular: [
          'hover:bg-green-900 hover:dark:bg-green-900 hover:text-neutral-100 bg-green-700 dark:bg-green-800 text-white',
        ],
        disabled: ['bg-green-200 text-white'],
      };
    default:
      return {
        regular: [
          'hover:bg-blue-500 hover:dark:bg-blue-900 hover:text-neutral-100 bg-blue-400 dark:bg-blue-800 text-white',
        ],
        disabled: ['bg-blue-200 text-white'],
      };
  }
};
const getClassesByColorSecondary = (color: string) => {
  switch (color) {
    case 'blue':
      return {
        regular: [
          'hover:text-neutral-100 hover:bg-blue-400  dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 border-solid border-2 border-blue-300 text-blue-300',
        ],
        disabled: ['border-solid border-2 text-neutral-400 border-neutral-400'],
      };
    case 'red':
      return {
        regular: [
          'hover:text-neutral-100 hover:bg-red-400 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 border-solid border-2 border-red-300 text-red-300',
        ],
        disabled: ['border-solid border-2 text-neutral-400 border-neutral-400'],
      };
    case 'green':
      return {
        regular: [
          'hover:text-neutral-100 hover:bg-green-400 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 border-solid border-2 border-green-300 text-green-300',
        ],
        disabled: ['border-solid border-2 text-neutral-400 border-neutral-400'],
      };
    default:
      return {
        regular: [
          'hover:text-neutral-100 hover:bg-blue-400 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 border-solid border-2 border-blue-300 text-blue-300',
        ],
        disabled: ['border-solid border-2 text-neutral-400 border-neutral-400'],
      };
  }
};
const getClassesByColorTertiary = (color: string) => {
  switch (color) {
    case 'blue':
      return {
        regular: ['hover:bg-blue-200 hover:text-neutral-100', 'text-blue-300'],
        disabled: ['text-neutral-400'],
      };
    case 'red':
      return {
        regular: ['hover:bg-red-200 hover:text-neutral-100', 'text-red-300'],
        disabled: ['text-neutral-400'],
      };
    case 'green':
      return {
        regular: [
          'hover:bg-green-200 hover:text-neutral-100',
          'text-green-300',
        ],
        disabled: ['text-neutral-400'],
      };
    default:
      return {
        regular: ['hover:bg-blue-200 hover:text-neutral-100', 'text-blue-300'],
        disabled: ['text-neutral-400'],
      };
  }
};
const getClassesBySize = (size: string) => {
  switch (size) {
    case 'xs':
      return 'px-3 py-2 text-xs';
    case 'sm':
      return 'px-3 py-2 text-sm';
    case 'md':
      return 'px-5 py-2.5 text-sm';
    case 'lg':
      return 'px-5 py-3 text-base';
    case 'xl':
      return 'px-6 py-3.5 text-base';
    default:
      return 'px-5 py-2.5 text-sm';
  }
};
export {
  getClassesByColorPrimary,
  getClassesByColorSecondary,
  getClassesByColorTertiary,
  getClassesBySize,
};
