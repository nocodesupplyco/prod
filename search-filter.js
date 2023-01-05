//----- SEARCH / FILTER MODS -----

$(function () {
  //-----------------------------------------------
  //--(1)-- Selected tags functionality -----------

  // create selected tag(s) function
  function createSelectedTags(trigger) {
    let checkLabel = trigger.find("span").text();
    let checkAttribute = trigger.data("check-label");
    let tagClone = $("#searched-tags").find("[data-tag]").first().clone().text(checkLabel).attr("data-tag-label", checkAttribute);
    // if the tag is not already in the searched-tags div, add it
    if ($("#searched-tags").find("[data-tag-label='" + checkAttribute + "']").length === 0) {
      $("#searched-tags").append(tagClone);
    }
  }

  // on load, create selected tags for any active filters
  setTimeout(() => {
    $("[data-check-label] .jetboost-filter-trigger").each(function () {
      if ($(this).hasClass("jetboost-filter-active")) {
        createSelectedTags($(this).parent("[data-check-label]"));
      }
    });
  }, 2000);

  // create a single selected tag on click
  $("[data-check-label]").click(function () {
    createSelectedTags($(this));
    document.querySelector("#search-reset").click();
  });

  // reset selected tag(s) function
  function updateSelectedTags(trigger) {
    let tagAttribute = trigger.data("tag-label");
    let tagTarget = "[data-check-label='" + tagAttribute + "']";
    $(tagTarget).click();
    $("#searched-tags")
      .find("[data-tag-label='" + tagAttribute + "']")
      .remove();
  }

  // reset a single selected tag
  $("#searched-tags").on("click", "[data-tag]", function () {
    updateSelectedTags($(this));
  });

  // reset all selected tags
  $("[reset-all]").on("click", function () {
    $("#searched-tags")
      .find("[data-tag-label]")
      .each(function () {
        updateSelectedTags($(this));
      });
  });

  //-----------------------------------------------
  //--(2)-- Toggle showing all filters ------------
  $("#show-all-filters").click(function () {
    let clicks = $(this).data("clicks");
    if (clicks) {
      $(".search_filter-tags-flex").removeClass("cc-show-all");
    } else {
      $(".search_filter-tags-flex").addClass("cc-show-all");
    }
    $(this).data("clicks", !clicks);
  });

  //-----------------------------------------------
  //--(3)-- Toggle type dropdown ------------------

  // Function to update the search type filter
  function updateTypeFilter(trigger) {
    // Get the text of the clicked radio button
    let text = trigger.find(".search_dropdown-radio-text").text();
    // Update the dropdown button text
    let dropdownBtn = trigger.closest(".search_dropdown").find(".search_dropdown-btn");
    dropdownBtn.find(".search_dropdown-btn-text").text(text);
    // Remove the active class from all radio buttons
    $(".search_dropdown-radio").removeClass("is-active");
    // Add the active class to the clicked radio button
    trigger.addClass("is-active");
  }

  // When clicking a type radio, run the function
  $(".search_dropdown-radio").on("click", function () {
    updateTypeFilter($(this));
  });
  $(".search_dropdown-reset").on("click", function () {
    updateTypeFilter($(this).find(".search_dropdown-radio"));
  });

  // on load, create selected tags for any active filters
  setTimeout(() => {
    $(".search_dropdown-radio .jetboost-filter-trigger").each(function () {
      if ($(this).hasClass("jetboost-filter-active")) {
        updateTypeFilter($(this).closest(".search_dropdown-radio"));
      }
    });
  }, 2000);

  //-----------------------------------------------
  //--(4)-- Hide search form and options if list is empty ----------

  if ($(".main-list_wrapper").find("div.w-dyn-empty").length !== 0) {
    $(".search_form-wrapper").hide();
    $(".main-list_options").hide();
  }
});

//----- END: SEARCH / FILTER MODS -----
