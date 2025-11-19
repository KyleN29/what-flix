import { useState, useRef, useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult
} from '@hello-pangea/dnd';
import './GenreRanking.css';
import { type Genre } from '../services/GenreService';

interface AddedGenre {
  rank: number;
  name: string;
}

interface Props {
  genres: Genre[];
}

function GenreRanking(props: Props) {
  // Controls visibility of the dropdown list of available genres
  const [showingGenreOptions, setShowingGenreOptions] = useState(false);

  // Ref for detecting clicks outside the genre options dropdown
  const genreOptionsRef = useRef<HTMLDivElement>(null);

  // List of genres added and ranked by the user
  const [genres, setGenres] = useState<AddedGenre[]>([]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutside =
        genreOptionsRef.current &&
        !genreOptionsRef.current.contains(event.target as Node);

      if (clickedOutside) {
        setShowingGenreOptions(false);
      }
    };

    // Attach or detach event listener based on dropdown visibility
    if (showingGenreOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showingGenreOptions]);

  // Adds a genre to the ranked list; prevents duplicates
  function addGenre(genre: Genre) {
    setGenres((prev) => {
      const exists = prev.some((g) => g.name === genre.name);
      if (exists) return prev;

      const nextRank = prev.length + 1;
      return [...prev, { rank: nextRank, name: genre.name }];
    });
  }

  // Updates rank numbers based on array order
  function assignRanks(list: AddedGenre[]) {
    return list.map((item, index) => ({
      ...item,
      rank: index + 1
    }));
  }

  // Handles drag-and-drop reordering
  function onDragEnd(result: DropResult) {
    const { destination, source } = result;

    const noDestination = !destination;
    const unchanged = destination && destination.index === source.index;

    // No movement occurred
    if (noDestination || unchanged) return;

    // Reorder list based on drag result
    const items = Array.from(genres);
    const [removed] = items.splice(source.index, 1);
    items.splice(destination.index, 0, removed);

    // Reassign ranks to reflect new order
    const ranked = assignRanks(items);
    setGenres(ranked);
  }

  return (
    <>
      {/* Genre dropdown container */}
      <div className="bg-green-500 cursor-pointer relative select-none">
        <div onClick={() => setShowingGenreOptions(!showingGenreOptions)}>
          + Add Genre
        </div>

        {/* Dropdown options list */}
        {showingGenreOptions && (
          <div id="genreOptions" ref={genreOptionsRef}>
            {props.genres.map((genre) => (
              <button
                key={genre.id}
                disabled={genres.some((g) => g.name === genre.name)} // Prevent selecting duplicates
                onClick={() => addGenre(genre)}
              >
                {genre.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Ranking list with drag-and-drop support */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="vertical">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                listStyleType: 'none',
                padding: 0
              }}
            >
              {genres.map((genre, index) => (
                <Draggable
                  key={genre.rank}
                  draggableId={genre.rank.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style
                      }}
                      className="bg-blue-500 select-none"
                    >
                      {genre.rank}: {genre.name}
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default GenreRanking;
