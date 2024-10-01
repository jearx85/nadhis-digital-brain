import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";

import "./PluginElastic.css";
import { useCategories } from "./hooks/useCategories";
import { useSemanticSearch } from "./hooks/useSemanticSearch";
import { useCreateNote } from "./hooks/useCreateNote";
import CategorySelect from "./components/CategorySelect";
import SearchInput from "./components/SeacrhInput";
import SemanticSearchTextarea from "./components/SemanticSearchTextarea";
import TitleList from "./components/TitleList";

const PluginElastic: React.FC = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const documents = useQuery(api.documents.getAllDocuments);

  const {
    options,
    selectedCategory,
    categoryContent,
    filteredTitles,
    handleCategoryChange,
    handleInputChange,
  } = useCategories();

  const {
    apiTitles,
    loading,
    handleSemanticSearch,
  } = useSemanticSearch();

  const { createNotePlugin }: any = useCreateNote(documents, router);

  return (
    <>
      <CategorySelect
        options={options}
        selectedCategory={selectedCategory}
        onChange={handleCategoryChange}
      />
      <SearchInput
        value={inputValue}
        onChange={handleInputChange}
      />
      <SemanticSearchTextarea onSearch={handleSemanticSearch} />
      {loading ? (
        <div className="w-full flex items-center justify-center mt-10">
          <Spinner size="lg" />
        </div>
      ) : (
        <TitleList
          titles={[...filteredTitles, ...apiTitles]}
          onTitleClick={createNotePlugin}
        />
      )}
    </>
  );
};

export default PluginElastic;
