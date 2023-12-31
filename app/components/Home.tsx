"use client";

/* Core */
import { useCallback, useState, useRef } from "react";

/* Instruments */
import {
  Release,
  useGetCollectionQuery,
  useGetWantlistQuery,
} from "@/app/api/discogs";

type ReleaseItemProps = {
  release: Release;
  selected: boolean;
  onClick: () => void;
};

export const ReleaseItem: React.FC<ReleaseItemProps> = ({
  release,
  selected,
  onClick,
}) => {
  const link = useCallback(() => {
    const releaseId = release.id;
    return `https://www.discogs.com/release/${releaseId}`;
  }, [release.id]);

  return (
    <div
      onClick={onClick}
      key={release.id}
      className={`cursor-pointer flex-item w-full aspect-square shadow-lg ${
        selected ? "selected" : ""
      }`}
      style={{
        backgroundImage: `url(${release.basic_information.cover_image}`,
        backgroundSize: "cover",
      }}
    >
      {selected && (
        <div className="w-full h-full bg-black/80 p-4 flex flex-col justify-center items-center">
          <div className="text-sm md:text-lg font-bold text-[#fff] font-serif text-center">
            {release.basic_information.title}
          </div>
          <div className="text-sm md:text-lg font-bold text-[#fff] font-serif text-center mt-3">
            {release.basic_information.artists[0].name}
          </div>
          <div className="mt-3">
            <span className="text-xs md:text-md text-[#eee] font-serif">
              {release.basic_information.year}
              {" · "}
            </span>
            <a
              href={link()}
              target="_blank"
              className="text-xs md:text-md text-[#eee] font-serif underline"
            >
              Link
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export const Home = () => {
  const { data: collection } = useGetCollectionQuery();
  const { data: wants } = useGetWantlistQuery();
  const [selectedRelease, setSelectedRelease] = useState<number | null>(null);
  const [searchString, setSearchString] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const collectionRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const filteredCollection = collection?.releases
    .slice()
    .sort((a, b) =>
      a.basic_information.artists[0].name.localeCompare(
        b.basic_information.artists[0].name
      )
    )
    .filter(
      (release) =>
        release.basic_information.title
          .toLowerCase()
          .includes(searchString.toLowerCase()) ||
        release.basic_information.artists[0].name
          .toLowerCase()
          .includes(searchString.toLowerCase())
    );

  const filteredWants = wants?.wants
    .slice()
    .sort((a, b) =>
      a.basic_information.artists[0].name.localeCompare(
        b.basic_information.artists[0].name
      )
    )
    .filter(
      (release) =>
        release.basic_information.title
          .toLowerCase()
          .includes(searchString.toLowerCase()) ||
        release.basic_information.artists[0].name
          .toLowerCase()
          .includes(searchString.toLowerCase())
    );

  const scrollToCollection = () => {
    collectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWishlist = () => {
    wishlistRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleSearch = () => {
   setSearchVisible(!searchVisible);
  };

  return (
    <div className="flex-1 w-full p-6 pt-2 max-w-[1600px] min-h-screen pt-16">
      <div className="fixed py-4 top-0 left-0 right-0 z-10 border-b border-gray-300/30 bg-[#702707]">
        <div className="flex items-center justify-center h-16">
        <button
            onClick={scrollToWishlist}
            className=" font-serif  px-4 py-2 mx-2 text-white hover:text-gray-300"
          >
            Wishlist
          </button>
          <button
            onClick={scrollToCollection}
            className="font-serif px-4 py-2 mx-2 text-white hover:text-gray-300"
          >
            Collection
          </button>
          <div className="text-4xl my-3 text-[#eee] font-rubik px-8">DaugHaus Vinyl
            
          </div>
          
          <button
            onClick={toggleSearch}
            className=" font-serif  px-4 py-2 mx-2 text-white hover:text-gray-300"
          >
            Search
          </button>
          <span
            className=" font-serif  px-4 py-2 mx-2 text-[#aaa] hover:text-gray-300"
          >
            Est. 2023
          </span>
          
        </div>
        {searchVisible && (
        <div className="w-full px-6">
          <input
          type="text"
          value={searchString}
          onChange={handleSearchChange}
          placeholder="Search by artist or release title"
          className="w-full mt-4 p-2 border border-gray-300 rounded-md bg-gray-200"
        />
        </div>
        )}
      </div>
      
     
      <h1 ref={wishlistRef} className="text-3xl mb-3 text-[#eee] font-serif pt-24">
        Wishlist
      </h1>
      <div className="flex-row flex-wrap w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredWants?.map((release) => (
          <ReleaseItem
            release={release}
            selected={selectedRelease === release.id}
            onClick={() => {
              if (selectedRelease === release.id) {
                setSelectedRelease(null);
              } else {
                setSelectedRelease(release.id);
              }
            }}
          />
        ))}
        {filteredWants?.length === 0 && (
          <div className="text-md md:text-xl text-[#ccc] font-serif">
            No results found
          </div>
        )}
      </div>

      <div className="inline-flex items-center justify-center w-full px-10">
        <hr className="w-full h-px my-10 bg-gray-400 border-0" />
      </div>
      <h1 ref={collectionRef} className="text-3xl mb-3 text-[#eee] font-serif pt-24">
        Current Collection
      </h1>
      <div className="flex-row flex-wrap w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5  xl:grid-cols-6 gap-4">
        {filteredCollection?.map((release) => (
          <ReleaseItem
            release={release}
            selected={selectedRelease === release.id}
            onClick={() => {
              if (selectedRelease === release.id) {
                setSelectedRelease(null);
              } else {
                setSelectedRelease(release.id);
              }
            }}
          />
        ))}
        {filteredCollection?.length === 0 && (
          <div className="text-md md:text-xl text-[#ccc] font-serif">
            No results found
          </div>
        )}
      </div>
    </div>
  );
};
