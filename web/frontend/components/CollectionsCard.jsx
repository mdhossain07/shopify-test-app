import { Button, Card, Text } from "@shopify/polaris";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

export function CollectionsCard() {
  const [deletingId, setDeletingId] = useState(null);
  // get collections
  const { data } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const response = await fetch("/api/collections");
      return await response.json();
    },
    refetchOnWindowFocus: false,
  });

  //   delete collections
  const queryClient = useQueryClient();

  const { mutate: deleteCollection } = useMutation({
    mutationFn: async (id) => {
      return await fetch(`/api/collection/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      setDeletingId(null);
    },
  });

  const handleDelete = (id) => {
    setDeletingId(id);
    deleteCollection(id);
  };

  return (
    <Card>
      <h2>Total Collections: {data?.collections?.edges.length}</h2>
      <div>
        {data?.collections.edges?.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <Text>
              Collection ID: {item.node.id}
              Collection Title: {item.node.title}
            </Text>
            <Button
              onClick={() => handleDelete(item.node.id.split("/")[4])}
              tone="critical"
              loading={deletingId === item.node.id.split("/")[4]}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
