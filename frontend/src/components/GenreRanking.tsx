import { useState, useRef, useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult
} from '@hello-pangea/dnd';
import './GenreRanking.css';
// Define a genre interface for better type safety
interface Genre {
  id: string;
  name: string;
}

function GenreRanking() {
  const [showingGenreOptions, setShowingGenreOptions] = useState(false);
  const genreOptionsRef = useRef<HTMLDivElement>(null);
  // Define an initial list of genres
  const initialGenres: Genre[] = [
    { id: '1', name: 'Pop' },
    { id: '2', name: 'Rock' },
    { id: '3', name: 'Jazz' },
    { id: '4', name: 'Classical' },
    { id: '5', name: 'Hip-Hop' }
  ];

  // State to store the genres list
  const [genres, setGenres] = useState<Genre[]>(initialGenres);

  // Handle drag end and reorder genres
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    // If dropped outside the droppable area, do nothing
    if (!destination) return;

    // If the item was dropped in the same position, do nothing
    if (destination.index === source.index) return;

    // Reorder the list
    const items = Array.from(genres);
    const [removed] = items.splice(source.index, 1); // Remove item from original position
    items.splice(destination.index, 0, removed); // Insert item in new position

    // Update the state with the new order
    setGenres(items);
  };

  //   const getItemStyle = (isDragging, draggableStyle) => ({
  //     // some basic styles to make the items look a bit nicer
  //     userSelect: "none",
  //     padding: grid * 2,
  //     margin: `0 0 ${grid}px 0`,

  //     // change background colour if dragging
  //     background: isDragging ? "lightgreen" : "grey",

  //     // styles we need to apply on draggables
  //     ...draggableStyle
  //     });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        genreOptionsRef.current &&
        !genreOptionsRef.current.contains(event.target as Node)
      ) {
        setShowingGenreOptions(false); // Close the options if clicked outside
      }
    };

    // Add event listener if the dropdown is showing
    if (showingGenreOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showingGenreOptions]);
  return (
    <>
      <div className="bg-green-500 cursor-pointer relative">
        <div onClick={() => setShowingGenreOptions(!showingGenreOptions)}>
          + Add Genre
        </div>
        {showingGenreOptions && (
          <div id="genreOptions" ref={genreOptionsRef}>
            <button>Horror</button>
            <button>Comedy</button>
          </div>
        )}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="vertical">
          {(provided) => (
            <div
              {...provided.droppableProps} // Attach droppableProps
              ref={provided.innerRef} // Attach innerRef
              style={{ listStyleType: 'none', padding: 0 }}
            >
              {genres.map((genre, index) => (
                <Draggable key={genre.id} draggableId={genre.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef} // Attach innerRef for draggable item
                      {...provided.draggableProps} // Attach draggableProps
                      {...provided.dragHandleProps} // Attach dragHandleProps
                      style={{ ...provided.draggableProps.style }}
                      className="bg-blue-500"
                    >
                      {genre.id}
                      {': '}
                      {genre.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder} {/* Add the placeholder here */}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default GenreRanking;
