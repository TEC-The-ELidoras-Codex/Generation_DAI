// You can customize how MDX renders elements by mapping them here.
export function useMDXComponents(components: Record<string, any>): Record<string, any> {
  return {
    // Example: h1: (props) => <h1 className="text-3xl font-bold" {...props} />,
    ...components
  };
}
