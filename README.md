# Keychain Label Creator

This project generates keychain labels based on customizable settings defined in a JSON file. The labels are created with specific dimensions and spacing as described in the `data.json` configuration file. The project uses pnpm for package management.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [pnpm](https://pnpm.io/) (v9 or higher)

## Installation

First, ensure that you have Node.js and pnpm installed. If you don't have pnpm, you can install it globally using npm:

```sh
npm install -g pnpm
```

Clone the repository and install dependencies:

```sh
pnpm install
```

## Configuration

The settings for the keychain label creation are defined in the data.json file. Below is a sample configuration:

```json
{
  "debug": false,
  "start": {
    "x": 20,
    "y": 40
  },
  "itemsPerRow": 7,
  "spacing": 5,
  "size": {
    "width": 32,
    "height": 19,
    "inner": {
      "width": 27,
      "height": 13
    }
  },
  "labels": [
    "Label 1",
    "Label 2",
    ...
  ]
}
```

### Configuration Details
- **debug**: Boolean to enable or disable debug mode.
- **start**: Starting coordinates (x, y) for label placement.
- **itemsPerRow**: Number of labels per row.
- **spacing**: Spacing between labels.
- **size**: Dimensions of each label and the inner area for text.
  - **width**: Total width of a label.
  - **height**: Total height of a label.
  - **inner**: Inner dimensions where the text will be placed.
    - **width**: Width of the inner text area.
    - **height**: Height of the inner text area.
- **labels**: Array of label texts to be generated.

## Usage
After configuring data.json, you can generate the labels using the following command:

```sh
pnpm generate
```

## Contributing
Contributions are welcome! Please fork the repository and create a pull request for any changes.
