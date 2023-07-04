# abp/ng.theme.matero

The `abp/ng.theme.matero` package is a powerful integration of the Matero theme into ABP Angular projects. This README provides an overview of the package code and instructions on how to use it effectively.

## Installation

Install the `abp/ng.theme.matero` package via npm:

```shell
npm install @abp/ng.theme.matero
```

## Usage

1. Import the `ThemeMateroModule` into your ABP Angular project:

   ```typescript
   import { ThemeMateroModule } from '@abp/ng.theme.matero';
   ```

2. Add `ThemeMateroModule` to the imports section of your NgModule:

   ```typescript
   @NgModule({
     imports: [
       // Other imports...
       ThemeMateroModule
     ],
     // Other module configurations...
   })
   export class AppModule { }
   ```

3. Once the package is imported, you can start using the Matero theme components and styles in your ABP Angular project. Replace the usage of `@abp/ng.theme.basic` with `@abp/ng.theme.matero` in your components, templates, and styles.

4. Refer to the Matero theme documentation for a comprehensive list of available components, styles, and customization options.



## Support

If you have any questions or issues, feel free to reach out to our support team or create an issue on the GitHub repository.

## Contributing

We welcome contributions from the community to enhance the `abp/ng.theme.matero` package. If you would like to contribute, please follow the guidelines outlined in the contributing guidelines document of the GitHub repository.

## License

This package is released under the [MIT License](https://opensource.org/licenses/MIT).

Enjoy using the Matero theme integration in your ABP Angular project with `@abp/ng.theme.matero`!
