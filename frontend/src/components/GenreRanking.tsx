import { useState, useRef, useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult
} from '@hello-pangea/dnd';
import './GenreRanking.css';
import { type Genre } from '../services/GenreService';
import UserService from '../services/UserService';
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

  // Controls visual of save button
  const [saving, setSaving] = useState(false);


  // Load user's current rankings from the database
  useEffect(() => {
    async function loadUserGenres() {
      try {
        const saved = await UserService.getUserGenreList();
        if (saved && saved.length > 0) {
          // Ensure they have correct ranks assigned
          const ranked = saved
            .sort((a, b) => Number(a.rank) - Number(b.rank))
            .map((g) => ({ name: g.name, rank: Number(g.rank) }));

          setGenres(ranked);
        }
      } catch (error) {
        console.error("Error loading user's saved genre ranking:", error);
      }
    }

    loadUserGenres();
  }, []);

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

    if (showingGenreOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showingGenreOptions]);

  // Add a genre to the ranking list
  function addGenre(genre: Genre) {
    setGenres((prev) => {
      const exists = prev.some((g) => g.name === genre.name);
      if (exists) return prev;

      const nextRank = prev.length + 1;
      return [...prev, { rank: nextRank, name: genre.name }];
    });
  }

  // Removes a genre and recalculates ranks
  function removeGenre(genreName: string) {
    setGenres((prev) => {
      const filtered = prev.filter((g) => g.name !== genreName);
      return assignRanks(filtered);
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

    if (noDestination || unchanged) return;

    const items = Array.from(genres);
    const [removed] = items.splice(source.index, 1);
    items.splice(destination.index, 0, removed);

    const ranked = assignRanks(items);
    setGenres(ranked);
  }

  async function savePreferences() {
    try {
      setSaving(true);

      await UserService.updateGenres(genres);

      setSaving(false);

    } catch (error) {
      setSaving(false);
      console.error('Error saving preferences:', error);
    }
  }

  return (
    <>
      <div className="genre-ranking">
        <button
          className="save-preferences-button"
          onClick={savePreferences}
          disabled={genres.length === 0 || saving}
        >
          {saving ? 'Saving...' : 'Save Preferences'}
        </button>
        <div className="genre-picker">
          <div
            className="genre-picker-button"
            onClick={() => setShowingGenreOptions(!showingGenreOptions)}
          >
            + Add Genre
          </div>

          {showingGenreOptions && (
            <div id="genreOptions" ref={genreOptionsRef}>
              {props.genres.map((genre) => (
                <button
                  key={genre.id}
                  disabled={genres.some((g) => g.name === genre.name)}
                  onClick={() => addGenre(genre)}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="vertical">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="genre-list-container"
              >
                {genres.map((genre, index) => (
                  <Draggable
                    key={genre.name}
                    draggableId={genre.name}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="genre-item"
                        style={{
                          ...provided.draggableProps.style,
                          backgroundColor: snapshot.isDragging
                            ? '#5c374c'
                            : '#5c374c',
                          borderColor: snapshot.isDragging
                            ? '#5c374c'
                            : '#5c374c'
                        }}
                      >
                        <span className="rank-badge">{genre.rank}</span>

                        <span className="genre-name">{genre.name}</span>

                        <button
                          className="delete-button"
                          onClick={() => removeGenre(genre.name)}
                        >
                          &times;
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}

export default GenreRanking;
