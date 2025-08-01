import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // useQuery,
} from "@apollo/client";
import { TaskList } from "./components/TaskList";
import CarList from "./components/CarList";

const client = new ApolloClient({
  uri: "/graphql", // MSW intercepts this
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <TaskList />
      <CarList/>
    </ApolloProvider>
  );
}
