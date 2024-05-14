
## Weather - Aquariux

### Project Details

Project uses NextJS, Tanstack Query (FKA React Query),  TailwindCSS, Shadcn (for some components)  and Jest for basic unit testing.

### Caveats
1. I hid the weather description on small devices as I felt that the icons were descriptive enough, users can view the text tapping on the icon.
2. I separated the history logic from actually fetching data:
	a. History uses localStorage (react-secure-storage).
	b. Fetching weather data uses URL query strings.